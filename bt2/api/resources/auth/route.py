from api.resources.auth import api
from api.resources.auth.controller import Register, Login, Status

api.add_resource(Register, "/register/")
api.add_resource(Login, "/login/")
api.add_resource(Status, "/status/")