# Generated by Django 5.1.6 on 2025-03-12 22:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Follower',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.TextField(blank=True, max_length=500)),
                ('gender', models.CharField(blank=True, max_length=6)),
                ('photo_url', models.URLField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Social',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('social_name', models.CharField(choices=[('Facebook', 'Facebook'), ('Twitter', 'Twitter'), ('Instagram', 'Instagram'), ('Youtube', 'Youtube'), ('TikTok', 'TikTok'), ('spotify', 'Spotify'), ('Other', 'Other')], max_length=50)),
                ('social_url', models.URLField()),
            ],
        ),
    ]
