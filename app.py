 # app.py
from flask import Flask, render_template, request, jsonify
import pandas as pd

# Load teacher data from Excel file
teacher_data = pd.read_excel('data.xlsx')

# Convert the data to a list of dictionaries
teachers = teacher_data.to_dict(orient='records')

# Display the loaded data (optional)
# print(teachers)
app = Flask(__name__)


def find_best_teacher(topic, learning_mode):
    topic = topic.lower()  # Convert the input to lowercase for case-insensitivity
    best_teacher = []

    for teacher in teachers:
        expertise = teacher["expertise"]
        matching_expertise = expertise.count(topic)

        # Check if the learning mode matches
        if matching_expertise == 1 and teacher["learning_mode"].lower() == learning_mode.lower():
            best_teacher.append(teacher["name"])

    return best_teacher


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        topic = request.form["topic"]
        learning_mode = request.form["learning-mode"]  # Get the selected learning mode
        best_teacher = find_best_teacher(topic, learning_mode)

        if best_teacher:
            return render_template("index.html", topic=topic, best_teacher=best_teacher)
        else:
            return render_template("index.html", topic=topic, message="No teacher found for this topic and learning mode.")

    return render_template("index.html")

@app.route("/get_best_teacher", methods=["GET"])
def get_best_teacher():
    topic = request.args.get("topic")
    learning_mode = request.args.get("learning_mode")
    expertise_level = request.args.get("expertise_level")
    lesson_type = request.args.get("lesson_type")
    
    matching_teachers = [
        teacher for teacher in teachers if (
            topic in teacher["expertise"].lower() and
            learning_mode.lower() == teacher["learning_mode"].lower() and
            expertise_level.lower() == teacher["expertise_level"].lower() and
            lesson_type.lower() == teacher["lesson_type"].lower()
        )
    ]
    
    if matching_teachers:
        best_teachers = [teacher["name"] for teacher in matching_teachers]
        return jsonify({"best_teachers": best_teachers})
    else:
        # Return an empty list when no teachers match the criteria
        return jsonify({"best_teachers": []})






@app.route('/templates/contact.html')
def contact():
    return render_template("contact.html")

@app.route('/indexmovies')
def indexmovies():
    return render_template("indexmovies.html")




if __name__ == "__main__":
    app.run(debug=True)
