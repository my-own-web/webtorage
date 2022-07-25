import styled from 'styled-components';
import { useState } from 'react';
import { MdEdit, MdDelete, MdCheck, MdClear } from 'react-icons/md';
import { useContentDispatch, useCategoryList } from "./InfoContext";

import WebHeader from './WebHeader';
import Input from "./design/Input";
import BigBox from './content/BigBox';
import Button from './design/Button';

const DarkBackground = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    background: rgba(0, 0, 0, 0.3);
`;

const PopupBox = styled.div`
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

    // 미사용
    .memo-box {
    display: flex;
    gap: 3px;
    height: 60px;
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

  // 미사용
  .memo-save-button{
    cursor: pointer;
    height: 20px;
    width: 20px;
    padding: 0 0 0 0;
    border: solid 1px #DBDCF5;
    color: ${props => props.editMemo ? 'red' : 'black'}
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
            <PopupBox>
                <b>URL</b>
                <Input />

                <b>Memo</b>
                <textarea className='textarea' />

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

                <b>Preview</b>
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
                <Button>저장</Button>
            </PopupBox>


        </>
    );
}