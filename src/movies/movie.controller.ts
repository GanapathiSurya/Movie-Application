import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieDTO } from "./dto/movie.dto";
import { ValidateObjectId } from "../pipes/validate-movie-id.pipe";
import { AuthGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";

@Controller('movies')
@UseGuards(AuthGuard)
export class MovieController {
    constructor(private readonly movieService: MovieService) { }

    @Post()
    @UseGuards(AdminGuard)
    async addMovies(@Res() res, @Body() movie: MovieDTO) {
        const addedMovie = await this.movieService.addMovie(movie);
        res.status(HttpStatus.OK).json({
            message: "Successfully added movie",
            movie: addedMovie
        })
    }

    @Get()
    async getMovies(@Res() res, @Query('title') title: string, @Query('genre') genre) {
        const movies = await this.movieService.getMovies(title, genre);
        res.status(HttpStatus.OK).json({
            message: "Fetched the list of movies",
            movies: movies
        })
    }

    @Put('/:movieID')
    @UseGuards(AdminGuard)
    async updateMovie(
        @Res() res,
        @Param('movieID', new ValidateObjectId()) movieID,
        @Body() movieData) {
        const movie = await this.movieService.updateMovie(movieID, movieData);
        if (!movie) {
            throw new BadRequestException("Movie not found");
        }
        res.status(HttpStatus.OK).json({
            message: "Updated Movie details-",
            movie: movie
        })
    }

    @Delete('/:movieID')
    @UseGuards(AdminGuard)
    async deleteMovie(
        @Res() res,
        @Param('movieID', new ValidateObjectId()) movieID) {
        const movie = await this.movieService.deleteMovie(movieID);
        if (!movie) {
            throw new BadRequestException("Movie not found");
        }
        res.status(HttpStatus.OK).json({
            message: "Removed Movie details",
            movie: movie
        })
    }
}