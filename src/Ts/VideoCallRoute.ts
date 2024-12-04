import axios from "axios";

const token = localStorage.getItem('token')

export async function getRoomId(){
    const endpoint = `http://localhost:8080/v1/vivaris/video-room`

    try {
        const response = await axios.get(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        });
        
        console.log(response);
        
        return response;
    } catch (error) {
        console.error("Erro ao obter dados dos profissionais:", error);
    }
}