from GoogleNews import GoogleNews

import asyncio
import aiohttp
from pathlib import Path
import shutil
from time import time
from datetime import datetime


def get_news_by_category(category, period):
    googlenews = GoogleNews(period=period)
    googlenews.get_news(category)
    news = googlenews.results(sort=True)[:20]
    save_news_images(news)
    return news


def time_track(func):
    def inner(*args, **kwargs):
        start = time()
        result = func(*args, **kwargs)
        end = time()
        working_time = end - start
        print(f'Worked for {working_time} seconds')
        return result
    return inner


def write_image(filename, data):
    with open(f'static/images/news/{filename}.jpg', 'wb') as handler:
            handler.write(data)


async def fetch_image(news_item, session):
    async with session.get(news_item['img']) as response:
        filename = str(datetime.now())
        news_item['img_path'] = f'static/images/news/{filename}.jpg'        
        data = await response.read()
        write_image(filename, data)


async def save_images(news):
    tasks = []
    async with aiohttp.ClientSession() as session:
        for news_item in news:
            task = asyncio.create_task(fetch_image(news_item, session))
            tasks.append(task)

        await asyncio.gather(*tasks)


@time_track
def save_news_images(news):
    """ Saving news images to static/images/news and adding new key "img_path" with image filename to News"""
    
    # Removing news folder with old images
    shutil.rmtree('static/images/news')

    # Creating it back
    Path('static/images/news').mkdir(parents=True, exist_ok=True)
    
    # And asyncly downloading images
    asyncio.run(save_images(news))
