import sys
import os


this_dir = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.dirname(this_dir))
from api import create_app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)

