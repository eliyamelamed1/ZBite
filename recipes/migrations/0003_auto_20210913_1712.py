# Generated by Django 3.1.12 on 2021-09-13 14:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_auto_20210913_1711'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recipe',
            old_name='saves',
            new_name='likes',
        ),
    ]
