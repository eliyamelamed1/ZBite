# Generated by Django 3.1.12 on 2021-11-18 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0004_auto_20210913_2115'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='cook_time',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='recipe',
            name='serving',
            field=models.TextField(blank=True),
        ),
    ]
