from users.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.views import View
from .models import Task
from .forms import TaskForm


@login_required
def personal_account(request):
    return render(request, 'users/personal_account.html')


def report(request):
    error = ''
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('personal_account')
        else:
            error = 'форма заполнена не корректно'

    form = TaskForm()
    context = {
        'form': form,
        'error': error,
    }
    return render(request, 'users/report.html', context)

class Register(View):

    template_name = 'registration/register.html'

    def get(self, request):
        context = {
            'form': UserCreationForm()
        }
        return render(request, self.template_name, context)

    def post(self, request):
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('home')
        context = {
            'form': form
        }
        return render(request, self.template_name, context)
