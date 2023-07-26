import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, getMovieList }: any) => {

    const navigate = useNavigate();

    const deleteMovieHandler = async (id: string) => {
        try {
            const movieDoc = doc(db, "movies", id);
            await deleteDoc(movieDoc);
            getMovieList();
        }
        catch (err) {
            console.log(err);
        }
    }

    const editMovieHandler = (id: string) => {
        navigate(`/edit-movie/${id}`);
    }
    return (
        <Card className="max-w-[350px]">
            <CardHeader className="">
                <CardTitle className="">
                    {movie.title}
                </CardTitle>
                <CardDescription>
                    {movie.receivedAnOscar ? "Awar Winner, Received Oscar"
                        : "Nominated for Award"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-lg font-medium">Released Year: {movie.releaseDate}</p>
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-6">
                <Button className="w-full"
                    onClick={() => editMovieHandler(movie.id)}>Edit</Button>
                <Button className="w-full"
                    variant="destructive"
                    onClick={() => deleteMovieHandler(movie.id)}>Delete</Button>
            </CardFooter>
        </Card>
    )
}


const ShowMovies = () => {
    const [movieList, setMovieList] = useState<any>([]);

    const moviesCollectionRef = collection(db, "movies");

    const getMovieList = async () => {
        try {
            const data = await getDocs(moviesCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setMovieList(filteredData);
            console.log(filteredData);
            console.log(data);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {

        getMovieList();
    }, []);

    return (
        <>
            {
                movieList.length > 0 &&
                movieList.map((movie: any) => {
                    return (
                        <MovieCard movie={movie} key={movie.id} getMovieList={getMovieList} />
                    )
                })
            }
        </>
    )
}



export default ShowMovies