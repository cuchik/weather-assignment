import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  List,
  Space,
  Typography,
} from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { ISearchHistory } from 'src/types';
import classes from './Home.module.scss';
import Icon from './Icon';
import { useActions, useIndexData } from './selectorData';

const { Title } = Typography;

const Home = () => {
  const [form] = Form.useForm();
  const [didSearch, setDidSearch] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const { weather, searchHistory, weatherLoading } = useIndexData();
  const { getWeather, syncUpdateSearchHistory } = useActions();

  return (
    <div className={classes.wrapper}>
      <Title level={2}>Today's Weather</Title>
      <Form
        form={form}
        name="weather-form"
        onFinish={(values) => {
          if (values.city && values.country) {
            const searchQ = [values.city, values.country].join(', ');
            getWeather(searchQ, (res: any) => {
              form.resetFields();
              setDidSearch(true);
              setSearchError(!res);
              if (res) {
                const tSearch: ISearchHistory = {
                  id: new Date().getTime(),
                  q: searchQ,
                  dateStr: moment().format('HH:mm:ss A'),
                };
                syncUpdateSearchHistory([...searchHistory, tSearch]);
              }
            });
          }
        }}
        initialValues={{
          city: '',
          country: '',
        }}
      >
        <Space>
          <Form.Item label="City" name="city">
            <Input name="city" />
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Input name="country" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={weatherLoading}>
            Search
          </Button>
          <Button
            htmlType="button"
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Space>
      </Form>
      <Space className={classes.content}>
        {didSearch && (
          <>
            {searchError ? (
              <Alert
                message="Not Found"
                type="error"
                className={classes.alert}
              />
            ) : (
              <Card className={classes.currentWeatherCard}>
                <span>
                  {weather.name}, {weather.sys?.country}
                </span>
                <Title level={1}>{weather.weather?.[0]?.main}</Title>
                <p>
                  <span>Description:</span>
                  <span>{weather.weather?.[0]?.description || ''}</span>
                </p>
                <p>
                  <span>Temperature:</span>
                  <span>
                    {weather.main?.temp_min || 0}&deg;C ~{' '}
                    {weather.main?.temp_max || 0}
                    &deg;C
                  </span>
                </p>
                <p>
                  <span>Humidity:</span>
                  <span>{weather.main?.humidity || 0}%</span>
                </p>
                <p>
                  <span>Time:</span>
                  <span>
                    {String(
                      moment(weather.dt * 1000).format('YYYY-MM-DD HH:mm A')
                    )}
                  </span>
                </p>
              </Card>
            )}
          </>
        )}
      </Space>
      <Title level={2}>Search History</Title>
      <List
        itemLayout="horizontal"
        dataSource={searchHistory}
        locale={{
          emptyText: 'No Record',
        }}
        renderItem={(item: ISearchHistory, index: number) => (
          <List.Item className={classes.searchHistoryItem}>
            <div>
              {index + 1}. {item.q}
            </div>
            <div>
              <span>{item.dateStr}</span>
              <Icon
                onClick={() => {
                  getWeather(item.q, () => {
                    setDidSearch(true);
                  });
                }}
              >
                <SearchOutlined rev="" />
              </Icon>
              <Icon
                onClick={() => {
                  syncUpdateSearchHistory(
                    searchHistory.filter(
                      (s: ISearchHistory) => s.id !== item.id
                    )
                  );
                }}
              >
                <DeleteOutlined rev="" />
              </Icon>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Home;
