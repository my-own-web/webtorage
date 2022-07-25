import styled from 'styled-components';
import { useState } from 'react';
import { MdEdit, MdDelete, MdCheck, MdClear } from 'react-icons/md';
import { useContentDispatch, useCategoryList } from "./InfoContext";

import WebHeader from './WebHeader';
import Input from "./design/Input";
import BigBox from './content/BigBox';
import Button from './design/Button';

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
    const dispatch = useContentDispatch();


    // $begin category select dropbox
    const cglist = useCategoryList();
    const [input, setInput] = useState('');

    const onChange = (e) => {
        setInput(e.target.value);
    }

    const onExit = () => {
        setInput('');
    }
    // $end category select dropbox

    return (
        <>
            <WebHeader />
            <CreateBox>
                <div className="item-container">
                    <b>URL</b>
                    <Input />
                </div>

                <div className="item-container">
                    <b>Memo</b>
                    <textarea className='textarea' />
                </div>

                <div className="item-container">
                    <b>Category</b>
                    <div className='category-select-container'>
                        <input list="category-list" className="category-choice" name="category-choice" placeholder="DEFAULT" onChange={onChange} value={input} />

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
                        <BigBox
                            id=""
                            category="DEFAULT"
                            title="title"
                            data_url="url"
                            image=""
                            description="description"
                            date="000000000000"
                            memo="memo"
                            checkedItemHandler={(id, add) => { }}
                            selectAll={false}
                            setSelectAll={false}
                        />
                        <Button className="add-button">저장</Button>
                    </div>
                </div>
            </CreateBox>


        </>
    );
}