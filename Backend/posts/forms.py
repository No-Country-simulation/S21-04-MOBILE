from django import forms
from .models import Post, Normal, Sample, Idea

class PostAdminForm(forms.ModelForm):
    description = forms.CharField()

    class Meta:
        model = Post
        fields = ['type', 'media_url', 'user', 'description']
        
    def clean(self):
        cleaned_data = super().clean()
        post_type = cleaned_data.get('type')
        description = cleaned_data.get('description')

        # Validar que haya descripción según el tipo de post
        if post_type in ['normal', 'sample', 'ideas'] and not description:
            raise forms.ValidationError('La descripción es obligatoria para este tipo de post.')

        return cleaned_data

    def save(self, commit=True):
        post = super().save(commit=False)
        description = self.cleaned_data.get('description')

        if commit:
            post.save()
            # Guardar la descripción en el modelo correspondiente
            if post.type == 'normal':
                Normal.objects.update_or_create(post=post, defaults={'description': description})
            elif post.type == 'sample':
                Sample.objects.update_or_create(post=post, defaults={'description': description})
            elif post.type == 'ideas':
                Idea.objects.update_or_create(post=post, defaults={'description': description})
        return post
