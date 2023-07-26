import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from "../config/firebase";
import { useNavigate } from 'react-router-dom';
import Form from '@/components/Form';
import { useParams, useLoaderData } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

interface movie {
    title: string,
    releaseDate: number,
    receivedAnOscar: boolean,
    movieImage: Blob | File | null
}

//imgRef.location.path actually should be stored to create refrences and updating images correctly 
//by deleting previous image stored by getting ref from the path stored
// const imgRef = ref(storage, `images/something${v4()}`);
// console.log(imgRef);

const EditMovie = () => {
    const docSnap: movie = useLoaderData() as movie;
    console.log(docSnap);
    console.log(docSnap.receivedAnOscar);
    const params = useParams();
    console.log(params.id);
    const navigate = useNavigate();

    const [movie, setMovie] = useState<movie>({
        title: docSnap ? docSnap.title as string : "",
        releaseDate: docSnap ? docSnap.releaseDate : 2023,
        receivedAnOscar: docSnap ? docSnap.receivedAnOscar : false,
        movieImage: null
    });


    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        try {
            e.preventDefault();
            let img_url: any = docSnap.movieImage;
            if (movie.movieImage) {
                const imgRef = ref(storage, `images/${movie.movieImage.name + v4()}`);
                await uploadBytes(imgRef, movie.movieImage);
                img_url = await getDownloadURL(imgRef);
            }
            const movieDoc = doc(db, "movies", params.id as string);
            await updateDoc(movieDoc, { ...movie, movieImage: img_url });
            navigate("/show-movies");
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <Form title="Edit"
            description="Enter details below to edit a movie please"
            movie={movie}
            setMovie={setMovie}
            submitHandler={onSubmit} />
    )
}

export default EditMovie