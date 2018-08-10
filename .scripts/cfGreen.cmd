CALL .scripts\app

CALL .scripts\cfMapBlue
cd .deploy-buildpack_0.0.1
cf push -f manifest-green.yml -n %APP-NAME%-green