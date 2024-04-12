import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigation } from '../components/Navigation';



export function HomePage() {
    //const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/name/`);

    return (
        <div>
            <Navigation></Navigation>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Obras Activas
                            </Typography>
                            <Typography variant="h5">
                                {/* Aquí puedes insertar el número de obras activas */}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Costos Totales
                            </Typography>
                            <Typography variant="h5">
                                {/* Aquí puedes insertar el costo total de las obras */}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Progreso General
                            </Typography>
                            <Typography variant="h5">
                                {/* Aquí puedes insertar el progreso general de las obras */}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Agrega más tarjetas según sea necesario */}
            </Grid>
        </div>
    );
}


