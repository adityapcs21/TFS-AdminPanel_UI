import React, { useCallback, useEffect, useRef, useState } from 'react';

import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';

export default function VideoGallery() {
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
            size: '1280-720',
            poster:
                'https://www.lightgalleryjs.com/images/demo/wistia-video-poster.jpeg',
            src: '//vimeo.com/112836958?muted=false',
            thumb:
                'https://www.lightgalleryjs.com/images/demo/wistia-video-poster.jpeg',
            subHtml: `<div class="lightGallery-captions">
                <h4>Photo by <a href="https://unsplash.com/@dann">Dan</a></h4>
                <p>Published on November 13, 2018</p>
            </div>`,
        },
        {
            id: '2',
            size: '1400-933',
            src: 'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
            thumb:
                'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                <h4>Photo by <a href="https://unsplash.com/@kylepyt">Kyle Peyton</a></h4>
                <p>Published on September 14, 2016</p>
            </div>`,
        },
        {
            id: '3',
            size: '1400-932',
            src: 'https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80',
            thumb:
                'https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                <h4>Photo by <a href="https://unsplash.com/@jxnsartstudio">Garrett Jackson</a></h4>
                <p>Published on May 8, 2020</p>
            </div>`,
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
            );
        });
    };

    useEffect(() => {
        lightGallery.current.refresh();
        console.log('videl', lgVideo);
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


