import { Box, Typography } from "@mui/material";
import Slider from "react-slick";

export default function HomePage(){
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };


    return(
        <>
        <Slider {...settings}>
            <div>
                <img src = "/images/image1.jpg" alt = "image" style={{display: 'block', width: '100%', maxHeight: 500}}/>
            </div>

            <div>
                <img src = "/images/image2.jpg" alt = "image" style={{display: 'block', width: '100%', maxHeight: 500}}/>
            </div>

            <div>
                <img src = "/images/image3.jpg" alt = "image" style={{display: 'block', width: '100%', maxHeight: 500}}/>
            </div>

        </Slider>

        <Box display='flex' justifyContent='center' sx={{p: 4}}>
            <Typography variant="h1">
                Welcome to the shop!
            </Typography>
            
        </Box>
        </>
    )
}