# Generated by Django 3.2.5 on 2021-08-11 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_auto_20210731_0852'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phone',
            name='image',
            field=models.ImageField(blank=True, default='/placeholder.jpg', null=True, upload_to=''),
        ),
    ]
