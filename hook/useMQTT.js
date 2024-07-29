import { useEffect, useState } from 'react';
import useGetConfig from './user/useGetConfig';
import useUser from './user/useUser';
import MQTT from '@/services/mqtt';

export const useMQTT = (topicsWithHandler = {}) => {
  const { config } = useGetConfig();
  const [clientReady, setClientReady] = useState(false);
  const { user, userId } = useUser();

  useEffect(() => {
    const client = MQTT.client();
    if (!client && config?.mqtt_ws && userId) {
      MQTT.init(
        user
          ? {
              password: user.signature,
              username: userId.toString(),
              url: config.mqtt_ws.url,
            }
          : config.mqtt_ws,
        {
          clientId: userId,
          clean: false,
        }
      );
      setTimeout(() => {
        setClientReady(true);
      }, 1);
    } else {
      setClientReady(false);
      MQTT.end();
    }
    return () => {
      setClientReady(false);
      MQTT.end();
    };
  }, [config, userId, user]);

  useEffect(() => {
    if (clientReady) {
      const client = MQTT.client();
      const handleMessage = (topic, message, packet) => {
        // console.log('mqtt message', topic, message.toString());

        if (topicsWithHandler[topic]) {
          // const messageObj = JSON.parse(message.toString());
          topicsWithHandler[topic](topic, message);
        } else {
          const client = MQTT.client();
          client.unsubscribe(topic);
        }
        try {
          /* empty */
        } catch (err) {
          console.log(err);
        }
      };
      client?.subscribe(
        Object.keys(topicsWithHandler),
        {
          qos: 2,
          nl: true,
        },
        (err) => {
          if (err) {
            console.error('mqtt fail subscribe', err);
          }
        }
      );

      client.on('message', handleMessage);
      return () => {
        client.removeListener('message', handleMessage);
      };
    }
  }, [clientReady, topicsWithHandler]);
  return { client: clientReady ? MQTT.client() : null };
};
