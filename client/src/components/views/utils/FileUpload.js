import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import { BOOK_SERVER } from '../../Config';
import { apiReqLog, apiResLog } from './logHelper';

const FileUpload = (props) => {
    const [ImageList, setImageList] = useState([]);

    const handleDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data'}
        };
        formData.append('file', files[0]);

        apiReqLog('/image', 'FileUpload', formData)
        axios.post(`${BOOK_SERVER}/image`, formData, config)
            .then(res => {
                if(res.data.success) {
                    apiResLog('/image', 'FileUpload', res.data);
                    setImageList([...ImageList, res.data.filePath]);
                    props.refreshFunction([...ImageList, res.data.filePath]);
                } else {
                    alert('파일 저장에 실패했습니다.');
                }
            })
    };

    const handleDelete = (image) => {
        const targetIndex = ImageList.indexOf(image); // 이미지 리스트 중에서 선택된 이미지 인덱스 뽑아옴

        let newImageList = [...ImageList]; // 새로운 배열 생성(깊은 복사)
        newImageList.splice(targetIndex, 1); // 배열에서 요소 삭제시 splice쓰는게 좋다.
        setImageList(newImageList);
    };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
                <div style={{ width: 300, height: 240, border: '1px solid lightgray', 
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                {...getRootProps()}>
                    <input {...getInputProps()} />
                    <AddPhotoAlternateIcon style={{ fontSize: '3rem'}}/>
                </div>
            )}
        </Dropzone>

        <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}} >
            {   // JSX리턴시에는 () 소괄호로 감싸야함
                ImageList.map((image, index) => (
                    <div onClick={() => handleDelete(image)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://localhost:5000/${image}`}/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default FileUpload


// ** 가장 쉽게 컨테이너 정중아 배치하는 방법
// display: 'flex', alignItems: 'center', justifyContent: 'center'