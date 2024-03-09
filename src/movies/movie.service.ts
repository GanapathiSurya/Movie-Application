import { Injectable, Param } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MovieDTO } from "./dto/movie.dto";
import { Movie } from "./interface/movie.interface";

@Injectable()
export class MovieService {
    constructor(@InjectModel("movie") private readonly movieModel: Model<Movie>) { }

    async addMovie(movieData: MovieDTO): Promise<Movie> {
        const addedMovie = await this.movieModel.create(movieData);
        return addedMovie.save();
    }

    async getMovies(title: string, genre: string): Promise<Movie[]> {
        let filterQuery = {};
        if (title) filterQuery = { ...filterQuery, title };
        if (genre) filterQuery = { ...filterQuery, genre };
        const movies = this.movieModel.find(
            filterQuery
        ).exec();
        return movies;
    }

    async updateMovie(movieID, movieData: MovieDTO): Promise<Movie> {
        const movie = this.movieModel.findByIdAndUpdate(movieID, movieData, { new: true }); // new is true so to return the updated document
        return movie;

    }

    async deleteMovie(movieID: string): Promise<Movie> {
        const movie = this.movieModel.findByIdAndRemove(movieID);
        return movie;
    }
}