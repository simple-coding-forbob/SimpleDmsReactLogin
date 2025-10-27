import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import type { IAuth } from "../types/auth/IAuth";

function Mypage() {
  const [member, setMember] = useState<IAuth | null>(null);

  useEffect(()=>{
    get()
  }, [])               // 화면 뜰 때 한 번만 호출

  const get = async () => {
    const response= await AuthService.mypage()
    const { result } = response.data;
    setMember(result);
    console.log(result)
  }
  

  return <div>
    { member &&  member.name} 님 반갑습니다.
  </div>;
}

export default Mypage;
