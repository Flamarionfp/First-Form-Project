import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { base64 } from 'base-64'
import { utf8 } from 'utf8'
import { render } from 'react-dom'

const Upload = () => {

   const [selectedFileUrl, setSelectedFileUrl] = useState('');
   const [base64, setBase64] = useState(null);
   console.log(base64)
  // o selectedFileUrl recebe o que estiver no acceptedFiles
  // normalmente, arquivos de upload é um array. Se for apenas um arquivo, é um array com a posição zero

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];  // a partir desse file, criamos a url do arquivo
    const fileUrl = URL.createObjectURL(file) // criado a url com o createObjectURL, ele joga para a variavel fileUrl, então se set essa url com o estado criado acima
    setSelectedFileUrl(fileUrl) //preview da imagem
    
    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result);
    }

    reader.readAsDataURL(file)
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' })

  return (
    <div className='upload' {...getRootProps()} accept="image/*" >
      <input  {...getInputProps()} />
      { selectedFileUrl // existe um valor no selectedFileUrl ?
        ? <img src={selectedFileUrl} alt="" /> // se existe, mostre a imagem aqui
        : <p id='imgPerfil'>Carregar imagem </p> // se não, mostre o paragrafo
      }
    </div>
    ) 
   

}

export default Upload;

 {/* 
  const convertBase64 = (file) => {

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)

      fileReader.onload(() => {
        resolve(fileReader.result);
      });

      fileReader.onerror((error) =>{
        reject(error);
      })
    })
    
  }*/}



    {/*const [selectedFileUrl, setSelectedFileUrl] = useState('');

  // o selectedFileUrl recebe o que estiver no acceptedFiles
  // normalmente, arquivos de upload é um array. Se for apenas um arquivo, é um array com a posição zero

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];  // a partir desse file, criamos a url do arquivo
    const fileUrl = URL.createObjectURL(file) // criado a url com o createObjectURL, ele joga para a variavel fileUrl, então se set essa url com o estado criado acima
    setSelectedFileUrl(fileUrl) //preview da imagem
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' })

  return (
    <div className='upload' {...getRootProps()} accept="image/*" >
      <input {...getInputProps()} />
      { selectedFileUrl // existe um valor no selectedFileUrl ?
        ? <img src={selectedFileUrl} alt="" /> // se existe, mostre a imagem aqui
        : <p id='imgPerfil'>Carregar imagem </p> // se não, mostre o paragrafo
      }
    </div>
    ) */}




     {/*const uploadImage = async (e) =>{
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    console.log(base64)

  }
  
  const convertBase64 = (file) => {

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) =>{
        reject(error);
      }

    })
    
  }

  return (
    <div>
      <input type='file' id='inputImage' onChange={(e) => {uploadImage(e)}} />
      <p> Carregar imagem</p>
     
    </div>
  ) */}