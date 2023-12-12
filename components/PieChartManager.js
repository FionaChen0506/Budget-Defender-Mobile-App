import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { VictoryPie, VictoryLegend } from 'victory-native'; 
import { auth, database } from '../firebase/firebaseSetup';
import { Dimensions } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// pie chart of category spending of selected month
export default function PieChartManager({selectedMonth}) {
  const [userUid, setUserUid] = useState(null);
  const [categorySpendingData, setCategorySpendingData] = useState([]);

  // listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // listen for changes to selected month
  useEffect(() => {
    if (userUid) {
      fetchCategorySpendingData(userUid, selectedMonth);
    }
  }, [userUid, selectedMonth]);

  // fetch category spending data from Firestore
  const fetchCategorySpendingData = async (userId) => {
    const q = query(collection(database, "Expenses"), where("user", "==", userId));
    try {
      const querySnapshot = await getDocs(q);
      let spendingData = {};
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.category && isWithinSelectedMonth(data.date, selectedMonth)) {
          const key = data.category;
          spendingData[key] = spendingData[key] ? spendingData[key] + data.amount : data.amount;
        }
      });

      setCategorySpendingData(formatDataForPieChart(spendingData));
    } catch (error) {
      console.error("Error fetching Firestore documents for user (category spending):", error);
    }
  };

  // check if expense is within selected month
  const isWithinSelectedMonth = (firebaseTimestamp, selectedMonth) => {
    const date = firebaseTimestamp.toDate();

    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const dateMonthYear = `${year}-${formattedMonth}`;

    return dateMonthYear === selectedMonth;
  };

  // format data for pie chart
  const formatDataForPieChart = (data) => {
    const total = Object.values(data).reduce((sum, value) => sum + value, 0);
    return Object.keys(data).map(key => {
      const percentage = ((data[key] / total) * 100).toFixed(1);
      return {
        x: percentage >= 5 ? `${percentage}%` : '-',
        y: data[key],
        categoryName: key
      };
    });

};

  // colors for pie chart
//   const colorScale = [
//     "#FF6384", // Vivid Pink
//     "#36A2EB", // Bright Blue
//     "#FFCE56", // Sunny Yellow
//     "#4BC0C0", // Sea Green
//     "#9966FF", // Soft Purple
//     "#FF9F40", // Tangerine Orange
//     "#7C4DFF", // Deep Indigo
//     "#66BB6A", // Apple Green
//     "#FF7043", // Coral Red
//     "#9CCC65", // Light Lime
//     "#26C6DA", // Sky Blue
//     "#FFCA28", // Amber
//     "#D4E157", // Light Olive
//     "#FFA726", // Orange Peel
//     "#EC407A", // Hot Pink
//     "#AB47BC"  // Lilac Purple
// ];
const colorScale = [
  "#4D8AF0", // Blue
  "#F7B32B", // Yellow
  "#F45B69", // Pink
  "#6CCF8F", // Green
  "#9B6EDE", // Purple
  "#FFA07A", // Light Salmon
  "#20B2AA", // Light Sea Green
  "#FFD700", // Gold
  "#C71585", // Medium Violet Red
  "#48D1CC", // Medium Turquoise
  // Add more colors as needed
];

  // legend data
  const legendData = categorySpendingData.map((item, index) => {
    return {
      name: item.categoryName,
      symbol: { fill: colorScale[index % colorScale.length] },
      labels: { fill: colorScale[index % colorScale.length] }
    };
});


  

return (
  <View style={styles.container}>
    <View style={styles.pieChartContainer}>
      {/* <VictoryPie
        animate={{ duration: 50 }}
        data={categorySpendingData}
        sortKey="y"
        sortOrder="descending"
        width={windowWidth * 0.6}
        height={windowWidth * 0.45}
        colorScale={colorScale}
        labelRadius={({ innerRadius }) => innerRadius + 30 }
        labelPosition="centroid"
        style={{
          labels: styles.dataLabels,
        }}
        innerRadius={12}
      /> */}
      <VictoryPie
        animate={{ duration: 50 }}
        data={categorySpendingData}
        sortKey="y"
        sortOrder="descending"
        width={windowWidth * 0.5}
        height={windowWidth * 0.5}
        colorScale={colorScale}
        labelRadius={({ innerRadius }) => innerRadius + 40 }
        labelPosition="centroid"
        style={{
          labels: { ...styles.dataLabels, fontSize: 10, fontFamily: "Roboto, sans-serif" },
          data: { stroke: "#fff", strokeWidth: 2 },
        }}
        innerRadius={12}
      />

    </View>
    <View style={styles.legendContainer}>
      <VictoryLegend
        width={windowWidth * 0.4}
        height={windowWidth * 0.45}
        // title="Category"
        centerTitle
        orientation="horizontal"
        style={{ title: styles.legendTitle, labels: styles.legendLabels, }} 
        data={legendData}
        itemsPerRow={1}
        rowGutter={1}
      />
    </View>
  </View>
);

}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 18,
    width: '90%', 
    height: windowHeight * 0.23,
    alignSelf: "center",
    backgroundColor: '#FFFBF5',
    marginTop: 20,
    shadowColor: 'gray',
        shadowOffset: { width: 5, height: 5 }, // Shadow offset
        shadowOpacity: 0.8, // Shadow opacity
        shadowRadius: 8, // Shadow radius
        elevation: 10, // Android shadow elevation
  },
  pieChartContainer: {
    flex: 0.5, 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    alignSelf: "center",
  },
  legendContainer: {
    flex: 0.5, 
    alignItems: 'center', 
    justifyContent: 'center',
    alignSelf: "center",
    paddingRight: 10,
    paddingTop: 10,
    height: '90%',
  },
  legendTitle: {
    fontSize: 16
  },
  legendLabels: {
    fill: "black", 
    fontSize: 12,
    fontFamily: "Helvetica Neue",
    fontWeight: "bold",
  },
  dataLabels: {
    fill: "black", 
    fontSize: 13,
    fontFamily: "Helvetica Neue",
  },

});
