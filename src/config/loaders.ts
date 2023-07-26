import { db } from '@/config/firebase.ts';
import { doc, getDoc } from "firebase/firestore";

export const editMovieLoader = async ({ params }: any) => {
    try {
        const docRef = doc(db, "movies", params.id as string);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        // if (data && data.movieImage !== "") {
        //     const response = await fetch(data.movieImage);
        //     console.log(response);
        //     data.movieImage = await response.blob();
        // }
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}