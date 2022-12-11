import styled from 'styled-components';
import { useState } from 'react';
import { MdEdit, MdDelete, MdCheck, MdClear } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import WebHeader from './WebHeader';
import Input from "./design/Input";
import BigBoxReadonly from './content/BigBoxReadonly';
import Button from './design/Button';
import { TodoApi } from '../utils/axios';
import { useCategoryList, useContentDispatch, useUserLoginId, useCurrentCategory } from "./InfoContext";


const CreateBox = styled.div`
    width: 500px;

    // position: fixed; 
    // top: 0;
    background: white;
    box-shadow: 0 0 8px 0 black; //rgba(0,0,0,100); // 박스 감싸는 그림자

    margin: 0 auto; // 페이지 중앙

    padding: 20px;
    margin-top: 10px;
    // margin-bottom: 32px;

    display: grid;
    gap: 10px;

    // 레이블과 입력창을 묶는 컨테이너
    .item-container{
        display: flex;
        flex-direction: column;
        width: 500px;
        // align-items: center;
        // justify-content: center;
    }

    .textarea{
        // width: 280px;
        height: 100px;
        resize:none;
        padding-left: 3px;
        font-size: 13px;
        font-family: sans-serif;
        border: solid 1px #DBDCF5;
    }

  .category-select-container{
        // width: 140px;
        // height: 25px;
        // text-decoration: underline;

        display: flex;
    }

   .category-choice{
        width: 100%;
    }

    // 미리보기와 저장 버튼 컨테이너
    .preview-add-container{
        display: flex;
        // justify-content: center;
        gap: 20px;
    }

    .add-button{
        width: 180px;
        height: 100px;
        align-self: end;
        background: black;
        color: white;
        font-size: 20px;
    }
`

export default function CreatePage() {
    const currentCategory = useCurrentCategory();
    const [inputs, setInputs] = useState({
        url: "",
        memo: "",
        category: currentCategory
    });
    const [previewInfo, setPreviewInfo] = useState({
        data_url: "",
        title: "",
        description: "",
        image: ""
    });
    const [dateString, setDateString] = useState("000000000000");
    const navigate = useNavigate();
    const dispatch = useContentDispatch();
    const userLoginId = useUserLoginId();

    // Date()를 DB date 문자열로 변환
    function parseDate() {
        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        let hours = ("0" + today.getHours()).slice(-2);
        let minutes = ("0" + today.getMinutes()).slice(-2);
        setDateString(year + month + day + hours + minutes);
    }

    const onChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }


    // url 입력창 focus 잃을 때
    const onBlur = e => {
        console.log(e.target.name + " lost focus, value:" + e.target.value); // dbg

        // URL 앞뒤 빈칸 제거
        let newURL = inputs.url.trim();
        // URL 앞에 http:// 없으면 오류 나므로 추가
        if (newURL && newURL.substring(0, 4) != "http") {
            newURL = "http://" + newURL;
        }
        setInputs({ ...inputs, url: newURL });

        parseDate(); // 시간 형식에 맞춰 가져오기
        scrapTabInfo(newURL); // 스크래핑
    }

    // $begin category select dropbox
    const cglist = useCategoryList();

    const onExit = () => {
        setInputs({
            ...inputs,
            category: ""
        });
    }
    // $end category select dropbox

    // 저장 버튼 눌러서 입력값 미리보기로 저장하기
    const onSave = () => {
        parseDate();

        console.log(`user[${userLoginId}] saves url[${inputs.url}]memo[${inputs.memo}]category[${inputs.category}]timestamp[${dateString}]`); // dbg

        // 서버로 탭 정보 post
        if (!inputs.url) {
            alert("URL을 입력하세요.");
        }
        else {
            postTabInfo();
        }
    }

    // 입력된 탭 정보를 서버로 POST 후 홈으로 이동
    async function postTabInfo() {
        try {
            let params = {
                data_url: inputs.url,
                title: previewInfo.title,
                description: previewInfo.description,
                image: previewInfo.image,
                memo: inputs.memo.trimEnd(),
                category: inputs.category,
                date: dateString,
                clientId: userLoginId
            }

            const { data } = await TodoApi.post('/tabinfo', params);

            console.log("postTabInfo res", data); // dbg

            if (data.success) {
                dispatch({ type: 'FETCH' });
                navigate("/");
            }
            else if (data.type == "tab") {
                alert("중복된 url");
            }
            else { // data.type="client"
                // 로그인 쿠키 만료
                alert(data.message);
                navigate("/login")
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function scrapTabInfo(url) {
        console.log("scapTabInfo " + url);
        try {
            const res = await TodoApi.post("/tabinfo/scrap", { url: url });
            console.log(res.data);
            setPreviewInfo({
                data_url: res.data.data_url,
                title: res.data.title,
                description: res.data.description,
                image: res.data.image
            });

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <WebHeader />
            <CreateBox>
                <div className="item-container">
                    <b>URL</b>
                    <Input onBlur={onBlur} name="url" value={inputs.url} onChange={onChange} />
                </div>

                <div className="item-container">
                    <b>Memo</b>
                    <textarea className='textarea' name="memo" value={inputs.memo} onChange={onChange} />
                </div>

                <div className="item-container">
                    <b>Category</b>
                    <div className='category-select-container'>
                        <input list="category-list" className="category-choice" name="category" placeholder="DEFAULT" onChange={onChange} value={inputs.category} />

                        <datalist id="category-list">
                            {cglist.map((cg) => (
                                <option value={cg.name}></option>
                            ))}
                        </datalist>

                        <MdClear onClick={onExit} style={{ cursor: 'pointer' }} />
                    </div>
                </div>

                <div className="item-container">
                    <b>Preview</b>
                    <div className="preview-add-container">
                        <BigBoxReadonly
                            category={inputs.category}
                            title={previewInfo.title}
                            data_url={previewInfo.data_url}
                            image={previewInfo.image}
                            description={previewInfo.description}
                            date={dateString}
                            memo={inputs.memo}
                            checkedItemHandler={(id, add) => { }}
                            selectAll={false}
                            setSelectAll={false}
                        />
                        <Button className="add-button" onClick={onSave}>저장</Button>
                    </div>
                </div>
            </CreateBox>


        </>
    );
}