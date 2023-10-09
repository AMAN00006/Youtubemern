
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";




const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {

    const [videos, setVideos] = useState([])
  axios.defaults.withCredentials=true

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`https://youtubeapis.vercel.app/api/videos/${type}`, { withCredentials: true });
                  console.log("Type prop:", type);
                //console.log("Response from API:", res);

            
            if (Array.isArray(res.data)) {
                // If it's already an array, use it directly
                setVideos(res.data);
            } else if (res.data.videos && Array.isArray(res.data.videos)) {
                // If it's an object with a 'videos' property that's an array
                setVideos(res.data.videos);
            } else {
                console.error("Invalid API response structure:", res.data);
            }




              

                // // Filter out duplicate videos based on unique _id
                // const uniqueVideos = res.data.filter((video, index, self) =>
                //     index === self.findIndex((v) => v._id === video._id)
                //     //self is a reference to the original array, which is res.data in this case.
                // );

                // setVideos(uniqueVideos);

            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };
        fetchVideos();
    }, [type]);

    return (
        <Container>
            {videos.map((video) => (
                <Card key={video._id} video={video} />


            ))}
        </Container>
    )
}

export default Home
