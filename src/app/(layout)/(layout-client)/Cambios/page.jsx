'use client'
import { useUser } from '@/context/Context'
import { onAuth } from '@/firebase/utils'
import Image from 'next/image'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import NavInit from '@/components/NavInit'
import { getSpecificData, } from '@/firebase/database'
import style from '@/app/(layout)/style.module.css'
import SelectCambio from '@/components/SelectCambio'
import { useState, useEffect } from "react";
import { WithAuth } from '@/HOCs/WithAuth'
import { useRouter, usePathname } from 'next/navigation';

export default function Home() {
  const { nav, setNav, user, userDB, setUserProfile, comision, select, setSelect, select2, setSelect2, isSelect, setIsSelect, isSelect2, setIsSelect2, state, setState, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, modal, setModal, setTransferencia, transferencia, divisas, setDivisas } = useUser()
  const pathname = usePathname()
  const router = useRouter()

  // const signInHandler = (e) => {
  //   e.preventDefault()
  //   let email = e.target[0].value
  //   let password = e.target[1].value
  //   email.length !== 0 && password.length !== 0 ? signInWithEmailAndPassword(email, password, setUserSuccess) : setUserSuccess('Complete')
  // }
  // useEffect(() => {
  //   user === undefined && onAuth(setUserProfile, setUserData)
  //   if (user !== undefined && user !== null) router.replace('/Cliente')
  // }, [user]);


  // console.log(pathname.toString().includes('Ca'))

  // function handlerTransfer(e) {
  //     e.preventDefault()
  //     console.log('click')
  //     if (user == null && user == undefined) {
  //       setModal('registrate')
  //       return
  //     }

  //     if (user && userDB == null) {
  //       router.push('/Register')
  //       return
  //     }

  //     if (user && userDB) {
  //       router.push('/Register/Destinatario')
  //       return
  //     }
  //     // setNav(!nav)
  //     // user !== null && user !== undefined
  //     //   ? console.log('si usuario')
  //     //   : setModal('Registrate o inicia sesión para completar tu transferencia')
  //     // return   console.log(modal)

  //   }

  const handlerSelect = (i) => {
    setSelect(i)

  }
  const handlerSelect2 = (i) => {
    setSelect2(i)
  }
  const handlerIsSelect = () => {
    setIsSelect(!isSelect)
    setIsSelect2(false)
  }
  const handlerIsSelect2 = () => {
    setIsSelect2(!isSelect2)
    setIsSelect(false)
  }

  async function handlerTransfer(e) {
    e.preventDefault()
    e.stopPropagation()

    if (user == null && user == undefined) {
      console.log('signup')
      setModal('registrate')
      return
    }
    if (user && userDB == null) {
      console.log('registrate')
      router.push('/Register')
      return
    }

    if ((divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) > 100000) {
      window.open('https://api.whatsapp.com/send?phone=+59177455743&text=Hola%20BOTTAK,%20necesito%20hacer%20una%20transacci%C3%B3n...', '_blank')
      return
    }

    user && userDB
      ? router.push('/Wallets')
      : router.push('/Register/Destinatario?operacion=Cambio')
  }
  useEffect(() => {
    if (user === undefined) onAuth(setUserProfile, setUserData)
    user && userDB === undefined && getSpecificData(`/users/${user.uid}`, setUserData)
  }, [user, userDB])


  return (
    <>
      <NavInit mobile={true} />
      <div className={`flex flex-col justify-center items-center h-[300px] lg:h-auto lg:hidden `}>
        <img src="/logo.svg" className={`h-[200px] w-[200px] ${style.logo}`} alt="User" />
        <h1 className='text-[#FFF500] text-[14px] font-light'>Cambios App</h1>
        <h3 className='text-white text-[14px] font-light'>Tus transferencias mas faciles y seguras</h3>
        <br />
        <div className='hidden lg:grid lg:grid-cols-2 lg:grid-gap-2 w-full '>
          <Button type="submit" theme={"Transparent"}>Registrate</Button>
          <Button type="submit" theme={"Primary"}>Iniciar Sesión</Button>
        </div>
      </div>
      <form className='lg:h-full lg:py-[30px]  w-full h-[370px] flex flex-col justify-between items-center  ' onSubmit={handlerTransfer}>
        <NavInit mobile={false} />

        {/* <h3 className='text-[greenyellow] text-[14px] font-light'>Solo disponible para Bolivia</h3> */}

        <div className="relative flex justify-between  w-[100%] sm:max-w-[350px] py-1 ">
          <span className="bg-transparent w-1/2 py-1 border-[1px] border-gray-200 text-gray-200 text-center">
            {divisas && divisas !== undefined && divisas[select2] && divisas[select2] !== undefined && select2 && select2 !== undefined && (divisas[select2].venta / divisas[select2].venta).toFixed(2)} {select2}
          </span>
          <button className='absolute left-0 right-0 top-0 bottom-0 m-auto bg-[yellow] rounded-full w-[50px] h-[50px]'>
            <svg xmlns="http://www.w3.org/2000/svg" className='w-full text-gray-800' viewBox="0 0 24 24"><defs><filter id="IconifyId1921c44ec09dd769a112"><feGaussianBlur in="SourceGraphic" result="y" stdDeviation="1" /><feColorMatrix in="y" result="z" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" /><feBlend in="SourceGraphic" in2="z" /></filter></defs><g filter="url(#IconifyId1921c44ec09dd769a112)"><circle cx="5" cy="12" r="4" fill="currentColor"><animate attributeName="cx" calcMode="spline" dur="2s" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite" values="5;8;5" /></circle><circle cx="19" cy="12" r="4" fill="currentColor"><animate attributeName="cx" calcMode="spline" dur="2s" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite" values="19;16;19" /></circle><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></g></svg>
          </button>
          <span className="bg-gray-200 w-1/2 py-1 border-[1px] border-gray-200 text-center text-gray-900 font-medium">
            {divisas && divisas !== undefined && divisas[select] && divisas[select] !== undefined && select && select !== undefined && (divisas[select].compra / divisas[select2].compra).toFixed(2)} {select}
          </span>
        </div>


        <SelectCambio onChange="Transference" placeholder='Monto a cambiar' propHandlerSelect={handlerSelect} propSelect={select} propHandlerIsSelect={handlerIsSelect} propIsSelect={isSelect} defaultValue={transferencia} />
        <span className='text-[#FFF500] text-[14px] font-light'>Cambiar a:</span>
        <SelectCambio value={true} propHandlerSelect={handlerSelect2} propSelect={select2} propHandlerIsSelect={handlerIsSelect2} propIsSelect={isSelect2} />
        <Button theme='Primary' click={handlerTransfer}> Cambiar </Button >
        <div className="">
          <div className='grid grid-cols-2 gap-[15px]'>
            <span className='text-white text-[14px] font-light'>Tasa de cambio </span>
            <span className='text-white text-[14px] font-light'>
              {divisas && divisas !== undefined && divisas[select2] && divisas[select2] !== undefined && select2 && select2 !== undefined && (divisas[select2].venta / divisas[select2].venta).toFixed(2)} {select2}
              =
              {divisas && divisas !== undefined && divisas[select] && divisas[select] !== undefined && select && select !== undefined && (divisas[select].compra / divisas[select2].compra).toFixed(2)} {select}
            </span>
          </div>
          <div className='grid grid-cols-2 gap-[15px]'>
            <span className='text-white text-[14px] font-light'>Comisiones</span>
            <span className='text-white text-[14px] font-light'>
              {comision} {select}
            </span>
          </div>
          {/* <div className='grid grid-cols-2 gap-[15px]'>
            <span className='text-white text-[14px] font-light'>Comisiones</span>
            <span className='text-white text-[14px] font-light'>
              {(divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) <= 1000 && divisas[select]['tarifa 1'] + ' ' + select}
              {(divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) <= 10000 && (divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) > 1000 && divisas[select]['tarifa 2'] + ' ' + select}
              {(divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) <= 100000 && (divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) > 10000 && divisas[select]['tarifa 3'] + ' ' + select}
              {(divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USDT'].compra / divisas[select].venta).toFixed(2)) > 100000 && 'CONTACTESE CON SOPORTE'}
            </span>
          </div> */}
          <a className='flex justify-center text-[14px] text-white bg-transaparent border-[1px] border-yellow-300 rounded-[5px] px-2 py-2 max-w-[250px] lg:hidden' href="/bottak.apk" download>
            <svg className='pr-[5px]' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.93933 17.086C2.90095 17.0866 2.0572 16.2417 2.05702 15.2035L2.05664 9.43999C2.05627 8.40274 2.89983 7.55805 3.93689 7.55786C4.44108 7.55749 4.9132 7.75305 5.26908 8.10855C5.62495 8.46405 5.8207 8.93692 5.82108 9.43961L5.82052 15.2034C5.82182 15.4505 5.77389 15.6953 5.67954 15.9237C5.58518 16.1521 5.44628 16.3594 5.27095 16.5335C5.09667 16.7092 4.8892 16.8486 4.6606 16.9434C4.432 17.0383 4.18683 17.0868 3.93933 17.086ZM3.93783 8.06355C3.17789 8.06317 2.56195 8.68061 2.56177 9.43999L2.5627 15.203C2.56265 15.5682 2.70761 15.9184 2.96572 16.1768C3.22382 16.4351 3.57395 16.5804 3.93914 16.5807C4.11998 16.5808 4.29905 16.5451 4.46611 16.4759C4.63317 16.4067 4.78495 16.3052 4.91275 16.1772C5.04055 16.0493 5.14188 15.8974 5.21094 15.7303C5.27999 15.5631 5.31543 15.384 5.3152 15.2032V9.43924C5.31481 9.07421 5.16951 8.72428 4.91124 8.46632C4.65297 8.20837 4.30285 8.0635 3.93783 8.06355Z" fill="white" />
              <path d="M18.7026 8.34884L18.1967 8.34866L5.79941 8.35034L5.29334 8.35053L5.29297 7.84447C5.29184 5.76697 6.42359 3.83478 8.27741 2.69328L7.55666 1.37759C7.46853 1.22347 7.44641 1.02828 7.49778 0.849781C7.52382 0.760755 7.5673 0.677794 7.62569 0.605723C7.68408 0.533652 7.75622 0.473909 7.83791 0.429968C7.9389 0.374362 8.05243 0.34551 8.16772 0.346156C8.42309 0.346156 8.65691 0.484718 8.78028 0.708593L9.53459 2.08278C10.3213 1.79485 11.1529 1.64853 11.9907 1.65059C12.8543 1.65022 13.6825 1.79628 14.4664 2.08391L15.2196 0.707468C15.2796 0.597655 15.3681 0.506048 15.4757 0.442297C15.5834 0.378546 15.7063 0.345009 15.8314 0.345218C15.9466 0.344855 16.06 0.373073 16.1616 0.427343C16.2434 0.471267 16.3156 0.531149 16.3739 0.603448C16.4322 0.675748 16.4754 0.758999 16.501 0.848281C16.5267 0.936323 16.5347 1.02861 16.5245 1.11977C16.5143 1.21093 16.486 1.29914 16.4413 1.37928L15.721 2.69422C17.5718 3.83816 18.7022 5.76884 18.702 7.84278L18.7026 8.34884ZM15.0377 2.88809L15.9983 1.13403C16.012 1.112 16.0211 1.0874 16.025 1.06174C16.0289 1.03607 16.0275 1.00989 16.0209 0.984775C16.0144 0.959663 16.0028 0.93615 15.9868 0.915672C15.9709 0.895194 15.9509 0.87818 15.9282 0.865668C15.9054 0.853157 15.8804 0.845409 15.8546 0.842899C15.8287 0.840389 15.8026 0.843169 15.7779 0.85107C15.7532 0.85897 15.7303 0.871825 15.7107 0.88885C15.6912 0.905875 15.6752 0.926713 15.664 0.950093L14.6935 2.72197C13.8771 2.35934 12.963 2.15553 11.9968 2.15647C11.0327 2.15553 10.1203 2.35859 9.30641 2.71991L8.33497 0.951968C8.32311 0.929873 8.30698 0.910355 8.28752 0.89455C8.26805 0.878744 8.24564 0.866966 8.22158 0.8599C8.19752 0.852834 8.17229 0.850621 8.14737 0.853391C8.12245 0.85616 8.09833 0.863856 8.07641 0.876031C7.98322 0.925906 7.94891 1.04309 8.00084 1.13459L8.96178 2.88734C7.07366 3.86122 5.79791 5.71559 5.79903 7.84466L18.1962 7.84316C18.1967 5.71484 16.9232 3.86422 15.0377 2.88809ZM9.17722 5.59878C9.03935 5.59871 8.90715 5.54387 8.80972 5.44632C8.71228 5.34878 8.65758 5.21653 8.65766 5.07866C8.65773 4.94078 8.71257 4.80859 8.81011 4.71115C8.90766 4.61372 9.03991 4.55902 9.17778 4.55909C9.31567 4.55934 9.44784 4.61421 9.54536 4.7117C9.64288 4.80918 9.6978 4.94133 9.69809 5.07922C9.6979 5.21718 9.64291 5.34942 9.54523 5.44685C9.44756 5.54428 9.31518 5.59893 9.17722 5.59878ZM14.8223 5.59766C14.754 5.59778 14.6864 5.58443 14.6233 5.55836C14.5602 5.5323 14.5028 5.49403 14.4546 5.44577C14.4063 5.3975 14.368 5.34017 14.3419 5.27708C14.3158 5.21399 14.3024 5.14637 14.3025 5.07809C14.303 4.94026 14.3579 4.8082 14.4553 4.71065C14.5527 4.6131 14.6846 4.55796 14.8225 4.55722C14.9601 4.55835 15.0917 4.61368 15.1889 4.71122C15.286 4.80876 15.3407 4.94064 15.3413 5.07828C15.3413 5.14646 15.3279 5.21398 15.3018 5.27698C15.2758 5.33998 15.2375 5.39723 15.1893 5.44546C15.1412 5.49369 15.0839 5.53195 15.021 5.55806C14.958 5.58418 14.8905 5.59763 14.8223 5.59766ZM9.69678 23.6548C8.65934 23.6547 7.81503 22.8109 7.81484 21.7727L7.81447 19.2289L7.31984 19.2295C7.06041 19.2304 6.80338 19.1798 6.56365 19.0806C6.32393 18.9814 6.10629 18.8355 5.92334 18.6516C5.73913 18.4687 5.59315 18.2509 5.49391 18.0111C5.39466 17.7712 5.34414 17.5139 5.34528 17.2543L5.34341 8.32428V7.81784H5.84947L18.1538 7.81597L18.66 7.81559V8.32166L18.6613 17.2528C18.6615 18.342 17.7754 19.2283 16.6866 19.2282L16.189 19.2285L16.1895 21.7714C16.1895 22.809 15.3454 23.6537 14.3083 23.6537C14.0611 23.6549 13.816 23.6068 13.5875 23.5122C13.359 23.4177 13.1516 23.2786 12.9775 23.103C12.8018 22.9289 12.6625 22.7217 12.5676 22.4933C12.4727 22.2648 12.4242 22.0199 12.4249 21.7725V19.2285H11.5791V21.772C11.5787 22.8098 10.7348 23.655 9.69678 23.6548Z" fill="white" />
              <path d="M5.85186 17.2541C5.85144 17.4471 5.88912 17.6383 5.96275 17.8167C6.03638 17.9951 6.1445 18.1572 6.28091 18.2937C6.41733 18.4302 6.57935 18.5385 6.75769 18.6122C6.93603 18.686 7.12718 18.7238 7.32017 18.7235H8.32011L8.32123 21.773C8.32105 22.5324 8.93792 23.1495 9.69655 23.1497C9.87736 23.1496 10.0564 23.1138 10.2234 23.0446C10.3904 22.9753 10.5421 22.8737 10.6699 22.7458C10.7976 22.6179 10.899 22.466 10.968 22.2989C11.0371 22.1318 11.0726 21.9527 11.0724 21.7719L11.0726 18.7234L12.9305 18.7228L12.9304 21.7721C12.9311 22.5317 13.5487 23.1495 14.3072 23.148C15.0677 23.1485 15.6842 22.5307 15.684 21.771L15.683 18.7224L16.6867 18.7222C17.4965 18.7224 18.1552 18.0645 18.1552 17.2528L18.1535 8.32123L5.84961 8.32348L5.85186 17.2541ZM20.0627 17.0835C19.0247 17.0837 18.1804 16.2401 18.1805 15.2017L18.179 9.43835C18.1794 8.40016 19.0224 7.55566 20.0599 7.55566C21.0986 7.55548 21.9435 8.39979 21.9433 9.43779L21.9439 15.2008C21.944 16.2384 21.1005 17.0837 20.0627 17.0835ZM20.0608 8.06173C19.3009 8.06098 18.6851 8.67804 18.6851 9.43835L18.6857 15.2015C18.6856 15.3823 18.7211 15.5614 18.7903 15.7284C18.8594 15.8955 18.9608 16.0472 19.0887 16.175C19.2165 16.3029 19.3683 16.4042 19.5354 16.4733C19.7025 16.5424 19.8815 16.5779 20.0623 16.5778C20.2431 16.5778 20.422 16.5422 20.589 16.473C20.756 16.4038 20.9077 16.3023 21.0355 16.1745C21.1633 16.0466 21.2646 15.8948 21.3337 15.7278C21.4028 15.5608 21.4383 15.3817 21.4382 15.201L21.4367 9.43798C21.4368 9.25724 21.4013 9.07825 21.3322 8.91125C21.2631 8.74424 21.1618 8.59249 21.034 8.46468C20.9062 8.33686 20.7545 8.23549 20.5875 8.16634C20.4205 8.0972 20.2415 8.06165 20.0608 8.06173Z" fill="white" />
              <path d="M3.93856 8.06335C3.17862 8.06297 2.56269 8.68041 2.5625 9.43978L2.56344 15.2028C2.56331 15.3836 2.59884 15.5627 2.66797 15.7298C2.73711 15.8969 2.8385 16.0487 2.96636 16.1765C3.09421 16.3044 3.24601 16.4058 3.41309 16.475C3.58017 16.5441 3.75924 16.5797 3.94006 16.5796C4.12086 16.5798 4.29993 16.5443 4.46699 16.4752C4.63406 16.4061 4.78585 16.3047 4.91366 16.1768C5.04147 16.0489 5.14279 15.8971 5.21182 15.73C5.28085 15.5629 5.31623 15.3838 5.31594 15.203V9.43903C5.31554 9.07401 5.17024 8.72407 4.91197 8.46612C4.6537 8.20816 4.30359 8.0633 3.93856 8.06335ZM15.0371 2.88797L15.9976 1.13391C16.0221 1.08941 16.0279 1.03703 16.0138 0.988242C15.9997 0.939456 15.9669 0.89825 15.9224 0.873659C15.8779 0.849583 15.8257 0.844095 15.7771 0.858392C15.7286 0.872689 15.6877 0.905611 15.6633 0.949972L14.693 2.72241C13.8766 2.35903 12.9629 2.15541 11.9962 2.15635C11.0321 2.15541 10.1188 2.35847 9.30575 2.71978L8.33431 0.951847C8.32245 0.929778 8.30633 0.910283 8.28689 0.894489C8.26744 0.878695 8.24505 0.866917 8.22102 0.859836C8.19699 0.852756 8.17179 0.850514 8.14689 0.853241C8.12198 0.855968 8.09787 0.863609 8.07594 0.875722C8.0538 0.887556 8.03424 0.903686 8.01841 0.92317C8.00257 0.942653 7.99079 0.965098 7.98373 0.989192C7.97668 1.01329 7.9745 1.03854 7.97733 1.06349C7.98015 1.08843 7.98792 1.11257 8.00019 1.13447L8.96112 2.88741C7.073 3.8611 5.79725 5.71547 5.79837 7.84453L18.1955 7.84303C18.1961 5.71472 16.9226 3.8641 15.0371 2.88797ZM9.17656 5.59866C9.03869 5.59858 8.9065 5.54374 8.80906 5.4462C8.71162 5.34866 8.65692 5.2164 8.657 5.07853C8.65707 4.94066 8.71191 4.80847 8.80946 4.71103C8.907 4.61359 9.03925 4.5589 9.17712 4.55897C9.31501 4.55922 9.44718 4.61409 9.5447 4.71157C9.64222 4.80906 9.69714 4.94121 9.69744 5.0791C9.69724 5.21706 9.64226 5.3493 9.54458 5.44673C9.4469 5.54416 9.31453 5.59881 9.17656 5.59866ZM14.8216 5.59753C14.7534 5.59758 14.6858 5.58418 14.6227 5.55809C14.5596 5.532 14.5023 5.49373 14.4541 5.44548C14.4058 5.39723 14.3675 5.33993 14.3414 5.27687C14.3153 5.21381 14.3019 5.14622 14.3019 5.07797C14.3026 4.94022 14.3576 4.8083 14.4549 4.7108C14.5522 4.6133 14.6841 4.55808 14.8218 4.5571C14.9594 4.55823 15.0911 4.61356 15.1882 4.7111C15.2853 4.80864 15.3401 4.94052 15.3406 5.07816C15.3407 5.14635 15.3273 5.21389 15.3013 5.27692C15.2752 5.33994 15.237 5.39721 15.1888 5.44544C15.1406 5.49368 15.0834 5.53194 15.0204 5.55804C14.9574 5.58414 14.8898 5.59756 14.8216 5.59753ZM5.849 8.32341L5.85106 17.255C5.85084 17.4479 5.88867 17.6389 5.9624 17.8172C6.03612 17.9954 6.14428 18.1574 6.28069 18.2938C6.4171 18.4302 6.57908 18.5383 6.75734 18.612C6.93561 18.6857 7.12666 18.7235 7.31956 18.7233L8.3195 18.7237L8.32062 21.7732C8.32044 22.5325 8.93769 23.1498 9.69594 23.1498C10.4564 23.1498 11.0726 22.532 11.0728 21.7722L11.072 18.7235L12.9299 18.7229L12.9307 21.7722C12.9307 22.531 13.5481 23.1496 14.3066 23.1481C15.0671 23.1487 15.6836 22.5308 15.6834 21.7711L15.6824 18.7225L16.6859 18.7218C16.8789 18.7218 17.0699 18.6838 17.2481 18.61C17.4264 18.5362 17.5883 18.428 17.7248 18.2916C17.8612 18.1552 17.9694 17.9933 18.0433 17.8151C18.1171 17.6369 18.1552 17.4458 18.1552 17.2529L18.1535 8.32135L5.849 8.32341ZM21.4366 9.43772C21.4367 9.25698 21.4011 9.078 21.3319 8.91101C21.2627 8.74402 21.1613 8.5923 21.0335 8.46451C20.9057 8.33672 20.7539 8.23537 20.5869 8.16625C20.4199 8.09712 20.2409 8.06158 20.0602 8.06166C19.3002 8.06091 18.6845 8.67797 18.6845 9.43828L18.6856 15.2017C18.6855 15.3824 18.721 15.5614 18.7901 15.7284C18.8592 15.8954 18.9606 16.0472 19.0884 16.175C19.2162 16.3028 19.3679 16.4041 19.5349 16.4732C19.702 16.5423 19.8809 16.5778 20.0617 16.5777C20.2425 16.5777 20.4215 16.5421 20.5885 16.4729C20.7555 16.4038 20.9072 16.3023 21.035 16.1745C21.1627 16.0466 21.2641 15.8948 21.3331 15.7277C21.4022 15.5607 21.4377 15.3817 21.4376 15.2009L21.4366 9.43772Z" fill="#A4C439" />
            </svg>
            Descargar APK
          </a>
        </div>
      </form>
    </>
  )
}




// // const res = await fetch('http://localhost:3000/api')
// const res = await fetch('/api', {
//   method: 'POST',
//   body: JSON.stringify({
//     type: 'Cambio de Divisa',
//     amount: transferencia,
//     comision: 0
//   }),
//   headers: new Headers({
//     'Content-Type': 'application/json; charset=UTF-8'
//   })
// })
// const data = await res.json()
// console.log(data)

// console.log(data.url)
// window.open(data.url, "_self")
// return
// console.log('click')
// if (user == null && user == undefined) {
//   console.log('signup')
//   setModal('registrate')
//   return
// }

// if (user && userDB == null) {
//   console.log('registrate')


//   router.push('/Register')
//   return
// }

// if (user && userDB) {

//   console.log('Destinatario')
//   router.push('/Register/Destinatario')
//   return
// }








{/* <dir>
                <Button theme='Secondary'>   Iniciar Sesión   </Button >
                <Button theme='secondary'>   registrate   </Button >
            </dir> */}






{/* <p className='text-white underline'>Politicas De Servicio</p> */ }
{/*   {success == 'AccountNonExist' && <Error>Cuenta inexistente</Error>}
      {success == 'Complete' && <Error>Complete el formulario</Error>} */}

{     /*{success == false && <Error>ERROR: verifique e intente nuevamente</Error>}
        {success == 'complete' && <Error>Llene todo el formulario</Error>} */}
//   <div className="">
//     <div className='grid grid-cols-2 gap-[15px]'><span className='text-white'>Tasa de cambio aplicado</span><span className='text-white'>1$ = 697 BOB</span></div>
//     <div className='grid grid-cols-2 gap-[15px]'><span className='text-white'>Comisiones</span><span className='text-white'>5 $</span></div>
//     <div className='grid grid-cols-2 gap-[15px]'><span className='text-white'>Pagas</span><span className='text-white'>0 $</span></div>
//   </div>
//   <br />