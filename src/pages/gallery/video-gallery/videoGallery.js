

import React, { useCallback, useEffect, useRef, useState } from 'react';

import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { Box } from '@mui/material';

export default function VideoGallery2() {
    const lightGallery = useRef(null);
    const [items, setItems] = useState([
        {
            id: '1',
            size: '1400-933',
            src: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
            thumb:
                'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',

        },
        {
            id: '6',
            src: '//vimeo.com/112836958?muted=false',
            thumb:
                'https://www.lightgalleryjs.com/images/demo/wistia-video-poster.jpeg',
        },
        {
            id: '2',
            src: 'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
            thumb:
                'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
        },
    ]);


    const onInit = useCallback((detail) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
    }, []);

    const getItems = () => {
        return items.map((item) => {
            return (
                <Box sx={{ border: "2px solid red" }}>
                    <a
                        key={item.id}
                        data-lg-size={item.size}
                        className="gallery-item"
                        data-src={item.src}

                    >
                        <img
                            alt=''
                            style={{ maxWidth: '280px' }}
                            className="img-responsive"
                            src={item.thumb}
                        />
                    </a>
                </Box >
            );
        });
    };

    useEffect(() => {
        lightGallery.current.refresh();
    }, [items]);

    return (
        <div>
            <LightGallery
                plugins={[lgVideo, lgZoom]}
                elementClassNames="custom-class-name"
                onInit={onInit}
            >
                {getItems()}
            </LightGallery>
        </div>
    );
}


