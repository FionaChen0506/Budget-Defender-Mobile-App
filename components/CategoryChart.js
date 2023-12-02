import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

//NOT DONE
const CategoryChart = ({ categoryData }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <BarChart
      data={{
        labels: categoryData.map((category) => category.name),
        datasets: [
          {
            data: categoryData.map((category) => category.spending),
          },
        ],
      }}
      width={screenWidth}
      height={220}
      yAxisLabel="$"
      chartConfig={{
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 2, 
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default CategoryChart;
