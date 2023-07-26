import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from "@/config/firebase";
import { useNavigate } from 'react-router-dom';
import Form from '@/components/Form';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

interface movie {
    title: string,
    releaseDate: number,
    receivedAnOscar: boolean,
    movieImage: Blob | File | null,
}

const CreateMovie = () => {
    const [movie, setMovie] = useState<movie>({
        title: "",
        releaseDate: 2023,
        receivedAnOscar: false,
        movieImage: null
    })


    const navigate = useNavigate();


    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        try {
            e.preventDefault();
            let img_url = "";
            if (movie.movieImage) {
                const imgRef = ref(storage, `images/${movie.movieImage.name + v4()}`);
                await uploadBytes(imgRef, movie.movieImage);
                img_url = await getDownloadURL(imgRef);
            }
            const moviesCollectionRef = collection(db, "movies");
            await addDoc(moviesCollectionRef, { ...movie, movieImage: img_url });
            navigate("/show-movies");
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <Form title="Create"
            description="Enter details below to create a new movie please"
            movie={movie}
            setMovie={setMovie}
            submitHandler={onSubmit} />
    )
}

export default CreateMovie