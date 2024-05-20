from rest_framework import serializers
from .models import User
from .models import Role


class UsuarioSerializer(serializers.ModelSerializer):
    #nombre    = serializers.CharField(source='get_full_name', read_only=True)
    role_user = serializers.SlugRelatedField(read_only=True, slug_field='name_role')
   
    class Meta:
        model = User
        fields = '__all__'



class UsuarioSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'doc_type_user', 'doc_number_user', 'gender_user', 'address_user', 'phone_user', 'role_user')



class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'