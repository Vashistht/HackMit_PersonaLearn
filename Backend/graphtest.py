import matplotlib.pyplot as plt
import mpld3

xAxis = [x for x in range(10)]
yAxis = [x for x in range(10)]

fig, ax = plt.subplots()

ax.plot(xAxis,yAxis, color='maroon', marker='o')

print(mpld3.fig_to_html(fig))