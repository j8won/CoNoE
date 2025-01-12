import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Layout from "../components/common/layout/Layout.jsx";
import StyledH3 from "../styles/StyledH3.js";
import DefaultButton from "../components/common/DefaultButton.jsx";
import RoomInfoRow from "../components/my-room/RoomInfoRow.jsx";
import EnterRoomModal from "../components/my-room/EnterRoomModal.jsx";
import BackdropModal from "../components/common/modal/BackdropModal.jsx";

import RoomAPI from "../api/RoomAPI.js";

const Container = styled.article`
  width: 700px;
  position: absolute;
  top: 10rem;
  margin-bottom: 10rem;
`;

const TitleBar = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function MyRoom() {
  // const roomInfoArray = [
  //   {
  //     roomId: "1",
  //     roomName: "캡스톤 모임",
  //     userName: "경주원",
  //     isAdmin: true,
  //   },
  //   {
  //     roomId: "2",
  //     roomName: "인공지능",
  //     userName: "이도연",
  //     isAdmin: false,
  //   },
  //   {
  //     roomId: "3",
  //     roomName: "스프링",
  //     userName: "이승건",
  //     isAdmin: false,
  //   },
  // ];

  const [roomInfoArray, setRoomInfoArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const getRoom = async () => {
    try {
      const response = await RoomAPI.getUserEnteredRoom();
      setRoomInfoArray([...response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isModalOpen) return;
    getRoom();
  }, [isModalOpen]);

  return (
    <Layout isLoggedIn={true} title="나의 방">
      <Container>
        <TitleBar>
          <StyledH3 style={{ width: "auto", marginBottom: 0 }}>
            나의 방
          </StyledH3>
          <DefaultButton
            text="입장하기"
            type="button"
            onClick={handleOpenModal}
            width="100px"
          />
        </TitleBar>

        <BackdropModal open={isModalOpen} setOpen={setIsModalOpen}>
          <EnterRoomModal setOpen={setIsModalOpen} />
        </BackdropModal>

        {roomInfoArray.map((info) => (
          <RoomInfoRow
            key={info.roomId}
            id={String(info.roomId)}
            name={info.title}
            manager={info.isAdmin ? "본인" : info.userName}
          />
        ))}
      </Container>
    </Layout>
  );
}

export default MyRoom;
