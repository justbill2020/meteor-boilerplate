CALL .scripts\app

cf map-route %APP-NAME%-Green g3.app.cloud.comcast.net -n %APP-NAME%
cf unmap-route %APP-NAME%-Blue g3.app.cloud.comcast.net -n %APP-NAME%
cf map-route %APP-NAME%-Green b3.app.cloud.comcast.net -n %APP-NAME%
cf unmap-route %APP-NAME%-Blue b3.app.cloud.comcast.net -n %APP-NAME%