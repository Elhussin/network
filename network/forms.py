from django import forms
from .models import UserProfile
class profileForm(forms.ModelForm):
    
    class Meta:
        model = UserProfile
        fields =( 'title' , 'bio' ,'img' ,)

