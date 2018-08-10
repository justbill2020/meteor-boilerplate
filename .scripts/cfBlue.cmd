CALL .scripts\app

CALL .scripts\cfMapGreen
cd .deploy-buildpack_0.0.1
cf push -f manifest-blue.yml -n %APP-NAME%-blue