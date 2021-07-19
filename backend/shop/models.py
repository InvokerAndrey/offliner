from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=255, null=True, blank=True)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(default=0, null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    cratedAt = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'Product: {self.name}'


class Attribute(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    stringValue = models.CharField(max_length=255, null=True, blank=True)
    decimalValue = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f'{self.product.name}: {self.name}'


class Category(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name_plural = 'Categories'


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey('Product', on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    rating = models.IntegerField(default=0, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return f'Review: {self.user.name} - {self.rating}'


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=255, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateField(auto_now_add=True, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'Order: {self.user} - {self.createdAt}'


class OrderItem(models.Model):
    product = models.ForeignKey('Product', on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey('Order', on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f'OrderItem: {self.name}'

    class Meta:
        verbose_name_plural = 'Order Items'


class ShippingAddress(models.Model):
    order = models.OneToOneField('Order', on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    postalCode = models.CharField(max_length=255, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f'Shipping Address: {self.address}'

    class Meta:
        verbose_name_plural = 'Shipping Addresses'
