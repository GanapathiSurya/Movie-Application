import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MovieService } from './movie.service';
import { MovieDTO } from './dto/movie.dto';

const movieData = [
    {
        "_id": "65ebe88424b44cfa6b788136",
        "title": "The Dark Knight",
        "genre": "Action",
        "rating": 5,
        "link": "https://www.link1.com",
    },
    {

        "title": "Inception",
        "genre": "Action",
        "rating": 4,
        "link": "https://www.link2.com",
    },
    {
        "title": "Get Out",
        "genre": "Horror",
        "rating": 3.5,
        "link": "https://www.link3.com",
    }
];

describe('MovieService', () => {
    let service: MovieService;

    const mockMovieModel = {
        create: jest.fn(),
        find: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndRemove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MovieService,
                {
                    provide: getModelToken('movie'),
                    useValue: mockMovieModel,
                },
            ],
        }).compile();

        service = module.get<MovieService>(MovieService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('It should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getMovies', () => {
        it('should return an array of all movies', async () => {
            mockMovieModel.find.mockReturnValueOnce({
                exec: jest.fn().mockResolvedValue(movieData),
            });
            const title = "";
            const genre = "";
            const result = await service.getMovies(title, genre);
            expect(result).toEqual(movieData);
        });

        it('should return an array of movies based on genre', async () => {
            mockMovieModel.find.mockReturnValueOnce({
                exec: jest.fn().mockResolvedValue(movieData.filter(movie => movie.genre === 'Horror')),
            });
            const title = "";
            const genre = "Horror";
            const result = await service.getMovies(title, genre);
            expect(result).toEqual(movieData.filter(movie => movie.genre === 'Horror'));
        });
    });
    describe('addMovie', () => {

        it('should add a new movie', async () => {
            const newMovieData: MovieDTO = {
                title: 'Test Movie',
                genre: 'Action',
                rating: 4.5,
                link: 'https://www.test.com/movie',
            };
            const expectedMovie = {
                _id: '123',
                ...newMovieData,
            };
            mockMovieModel.create.mockReturnValueOnce({
                ...expectedMovie,
                // Mock the save method to resolve with the movie object
                save: jest.fn().mockResolvedValueOnce(expectedMovie),
            });
            const result = await service.addMovie(newMovieData);
            expect(result).toEqual(expectedMovie);
        });
    });
    describe('updateMovie', () => {

        it('should update an existing movie', async () => {
            const movieID = '123';
            const updatedMovieData: MovieDTO = {
                title: 'Updated Test Movie',
                genre: 'Action',
                rating: 4.7,
                link: 'https://www.test.com/movie',
            };
            const updatedMovie = {
                _id: movieID,
                ...updatedMovieData,
            };
            mockMovieModel.findByIdAndUpdate.mockResolvedValueOnce(updatedMovie);
            const result = await service.updateMovie(movieID, updatedMovieData);
            expect(result).toEqual(updatedMovie);
        });
    });
    describe('deleteMovie', () => {
        it('should delete an existing movie', async () => {
            const movieID = '123';
            const deletedMovie = {
                title: 'Test Movie',
                genre: 'Action',
                rating: 4.5,
                link: 'https://www.test.com/movie',
            };
            mockMovieModel.findByIdAndRemove.mockResolvedValueOnce(deletedMovie);
            const result = await service.deleteMovie(movieID);
            expect(result).toEqual(deletedMovie);
        });
    });
});
