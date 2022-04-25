import { ImageList } from '@mui/material';
import React from 'react'
import Dropzone from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const FileUpload = (props) => {
    const handleDrop = () => {

    };

    const handleDelete = () => {

    };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
                <div style={{ width: 300, height: 240, border: '1px solid lightgray', 
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                {...getRootProps()}>
                    <input {...getInputProps()} />
                    <AddPhotoAlternateIcon style={{ fontSzie: '3rem'}}/>
                </div>
            )}
        </Dropzone>

        <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}} >
            {
                // ImageList.map((image, index) => {
                //     <div onClick={() => handleDelete()} key={index}>
                //         <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                //             src={`http://localhost:5000/${image}`}/>
                //     </div>
                // })
            }
        </div>
    </div>
  )
}

export default FileUpload