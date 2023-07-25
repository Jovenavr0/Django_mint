from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django import forms
from django.utils.translation import gettext_lazy as _

from .models import Task
from django.forms import ModelForm, TextInput, Textarea
 
User = get_user_model()

class UserCreationForm(UserCreationForm):
    username = forms.CharField(label='Логин', widget=forms.TextInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(
        label=_("Email"),
        max_length=254,
        widget=forms.EmailInput(attrs={"autocomplete": "email", 'class': 'form-control'}),
    )
    password1 = forms.CharField(label='Пароль', widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    password2 = forms.CharField(label='Повторите пароль', widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    class Meta(UserCreationForm.Meta):
        model =  User
        fields = ("username", "email")


class TaskForm(ModelForm):
    class Meta:
        model = Task
        fields = ["title", "task"]
        widgets = {
            "title": TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Ведите название',
            }),
            "task": Textarea(attrs={
            'class': 'form-control',
            'placeholder': 'Ведите описание',
            }),
        }
