from flask import render_template, request, jsonify, request, redirect, url_for
from main import app, db
from main.models import Movie

@app.route('/add_movie', methods=['POST'])
def add_movie():
    movie_data = request.get_json()
    # print(request.get_data()) #apparently works with body, so you could use ifs to check for .content_type and act accordingly
    if movie_data == None: 
        return "Empty request!", 400
    movie = Movie(title=movie_data['title'], raiting=movie_data['raiting'])
    db.session.add(movie)
    db.session.commit()
    return "Done", 201 #you can also return a status code after a comma

@app.route('/show_movies')
def show_movies():
    movies = []
    for movie in Movie.query.all():
        movies.append({"title": movie.title, "raiting": movie.raiting, "id": movie.id})

    return jsonify({'movies': movies})

@app.route('/delete_movie', methods=['POST'])
def delete_movie():
    deleting_movie = Movie.query.get_or_404(request.get_json()['deleting'])
    db.session.delete(deleting_movie)
    db.session.commit()

    return "Deleted", 201