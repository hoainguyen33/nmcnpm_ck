# Generated by Django 4.0.4 on 2022-05-29 10:20

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0007_alter_season_logo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='season',
            name='rank',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, size=None),
        ),
    ]
