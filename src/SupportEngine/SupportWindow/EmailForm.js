import React, { useCallback, useState } from "react";

import { styles } from "../styles";

import { LoadingOutlined } from "@ant-design/icons";

import Avatar from "../Avatar";
import axios from "axios";

export const EmailForm = (props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function getOrCreateUser(callback) {
    console.log(process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY);
    axios
      .put(
        "https://api.chatengine.io/users/",
        {
          username: email,
          secret: email,
          email: email,
        },
        {
          headers: {
            "PRIVATE-KEY": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
          },
        }
      )
      .then((r) => callback(r.data));
  }

  function getOrCreateChat(callback) {
    axios
      .put(
        "https://api.chatengine.io/chats/",
        {
          usernames: ["JALZ DELEZ", email],
          title: "Another Surprise Party!",
          is_direct_chat: true,
        },
        {
          headers: {
            "Project-ID": "a937c2a4-688e-4dd6-be3e-018b9dff09fb",
            "User-Name": email,
            "User-Secret": email,
          },
        }
      )
      .then((r) => callback(r.data))
      .catch((e) => console.log("Get or create chat error", e));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    console.log("Sending Email", email);

    getOrCreateUser((user) => {
      props.setUser && props.setUser(user);
      getOrCreateChat((chat) => {
        setLoading(false);
        props.setChat && props.setChat(chat);
      });
    });
  }
  return (
    <div
      style={{
        ...styles.emailFormWindow,
        ...{
          height: props.visible ? "100%" : "0%",
          opacity: props.visible ? "1" : "0",
        },
      }}
    >
      <div style={{ height: "0px" }}>
        <div style={styles.stripe} />
      </div>

      <div
        className="transition-5"
        style={{
          ...styles.loadingDiv,
          ...{
            opacity: loading ? "0.33" : "0",
            zIndex: loading ? "10" : "-1",
          },
        }}
      />
      <LoadingOutlined
        className="transition-5"
        style={{
          ...styles.loadingIcon,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "1" : "0",
            fontSize: "82px",
            top: "calc(50% - 41px)",
            left: "calc(50% - 41px)",
          },
        }}
      />

      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Avatar
          style={{
            position: "relative",
            left: "calc(50% - 44px)",
            top: "10%",
          }}
        />
        <div style={styles.topText}>
          Welcome to my <br /> support
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{ position: "relative", width: "100%", top: "19.75%" }}
        >
          <input
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
            style={styles.emailInput}
          />
        </form>

        <div style={styles.bottomText}>
          Enter your email <br /> to get started
        </div>
      </div>
    </div>
  );
};
/* 


  const mTemp = async () => {
    const a = await axios.put(
      "https://api.chatengine.io/users/",
      {
        username: "adam_la_morre",
        secret: "pass1234",
      },
      {
        headers: {
          "PRIVATE-KEY": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
        },
      }
    );

    console.log(a.data, "ONE");

    try {
      const b = await axios.put(
        "https://api.chatengine.io/chats/",
        {
          usernames: ["adam_la_morre", "JALZ DELEZ"],
          title: "Another Surprise Party!",
          is_direct_chat: true,
        },
        {
          headers: {
            "Project-ID": "a937c2a4-688e-4dd6-be3e-018b9dff09fb",
            "User-Name": "adam_la_morre",
            "User-Secret": "pass1234",
          },
        }
      );

      console.log(b.data, "TWO");
    } catch (error) {
      console.log(error);
    }
  };

          <button type="button" onClick={mTemp}>
            XXXXXXXXXXXx
          </button>
 */