from main_multithread_v234 import multi_threaded_scrape
from time import perf_counter

for i in range(1,8):
    start_time = perf_counter()
    multi_threaded_scrape(i)
    multi_threaded_scrape(i)
    multi_threaded_scrape(i)
    multi_threaded_scrape(i)
    multi_threaded_scrape(i)
    end_time = perf_counter()
    print(f'It took an average of {(end_time - start_time)/5: 0.2f} second(s) to complete the task with {i} thread(s)')