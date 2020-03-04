from flask import render_template, request, jsonify, request
from main import app, db
from main.models import Movie

@app.route('/add_movie', methods=['POST'])
def add_movie():
    movie_data = request.get_json()
    # print(dir(request))
    # print(request.get_data()) #apparently works with body, so you could use ifs to check for .content_type and act accordingly
    print(request.content_type)
    movie = Movie(title=movie_data['title'], raiting=movie_data['raiting'])
    db.session.add(movie)
    db.session.commit()
    return 'Done', 201 #you can also return a status code after a comma

@app.route('/show_movies')
def show_movies():
    movies = []
    
    for movie in Movie.query.all():
        movies.append({"title": movie.title, "raiting": movie.raiting})

    return jsonify({'movies': movies})

