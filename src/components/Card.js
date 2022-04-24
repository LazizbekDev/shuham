import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Chip, Rating, Stack, LinearProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios"
import { Link } from 'react-router-dom'

const CardBox = ({ url, title, description, status, progress, priority, id }) => {
    const [show, setShow] = useState('block')
    const [ip, setIp] = useState(null)
    const deleteHandler = async () => {
        const response = await axios.delete(`https://shuda.herokuapp.com/tickets/${id}`)
        const success = response.status === 200;

        if (success) setShow('none')
    }

    const fetchData = async () => {
        const { data } = await axios.get('https://api.ipdata.co/?api-key=f4a9d1375f7e057f3c060e59d869cb8424c01be6a44ae4e89959ee1a')

        setIp(data.ip)
    }

    fetchData()

    const getColor = (status) => {
        let color;
        switch (status) {
            case 'done':
                color = 'success'
                break;
            case 'in progress':
                color = 'primary'
                break;
            case 'stuck':
                color = 'warning'
                break;
            default: color = 'secondary'
        }
        return color
    }

    return (
        <Card sx={{ maxWidth: 345, display: show }}>
            {ip === localStorage.getItem('IP') ? (
                <Link to={`/shu/${id}`}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={`https://source.unsplash.com/random?${url}&sig=${Math.round(Math.random() * 100)}`}
                        alt="green iguana"
                    />
                </Link>
            ) : (
                <CardMedia
                    component="img"
                    height="140"
                    image={`https://source.unsplash.com/random?${url}&sig=${Math.round(Math.random() * 100)}`}
                    alt="LazizbekDev"
                />
            )}

            <LinearProgress variant="determinate" value={progress} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">{description}</Typography>
                <Rating name="read-only" value={priority} readOnly />

            </CardContent>
            <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                <Stack direction="row" spacing={1}>
                    <Chip label={status} color={getColor(status)} />
                </Stack>
                {/* {ip == localStorage.getItem('IP') && (
                    <Button size="small" onClick={deleteHandler}>
                        <DeleteIcon sx={{ color: red[400] }} />
                    </Button>
                )} */}
            </CardActions>
        </Card>
    );
};

export default CardBox;