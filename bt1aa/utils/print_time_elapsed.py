import time
def print_time_elapsed(func, *args, **kwargs):
    start_time = time.perf_counter()
    func(*args, **kwargs)
    end_time = time.perf_counter()
    print(f'It took {end_time- start_time: 0.2f} second(s) to complete.')