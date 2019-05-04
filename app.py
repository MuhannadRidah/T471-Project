from flask import Flask, render_template, request
import json
import populartimes

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def getplaceid():
        test = request.form['placeid'] 
        output = populartimes.get_id("AIzaSyAZFFEUni2nsr77UIluMmRl5v-7XGwrAO8", f"{test}")   
        return render_template('backend.html', p=output)

if __name__ == '__main__':
        app.run(debug=True)