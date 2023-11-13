<script>
export default {};
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <div
      class="flex flex-col border-t-8 border-gray-800 bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl w-50 max-w-md"
    >
      <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
        Welcome to Voxela
      </div>
      <hr />
      <div class="mt-1 self-center text-xl sm:text-sm text-gray-800">
        Share your thoughts and stories with us!
      </div>

      <div class="mt-10">
        <form
          @submit="
            ($event) => {
              $event.preventDefault();
              console.log($event.target.value);
            }
          "
        >
          <div class="flex flex-row gap-6">
            <div class="flex flex-col mb-5">
              <label
                for="email"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >Name:</label
              >
              <div class="relative">
                <div
                  class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                >
                  <i class="fas fa-user text-gray-800"></i>
                </div>

                <input
                  id="email"
                  type="text"
                  name="email"
                  class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your name"
                />
              </div>
            </div>
            <div class="flex flex-col mb-5">
              <label
                for="email"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >E-Mail Address:</label
              >
              <div class="relative">
                <div
                  class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                >
                  <i class="fas fa-at text-gray-800"></i>
                </div>

                <input
                  id="email"
                  type="text"
                  name="email"
                  class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-6">
            <div class="flex flex-col mb-6">
              <label
                for="password"
                class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >Password:</label
              >
              <div class="relative">
                <div
                  class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                >
                  <span>
                    <i class="fas fa-lock text-gray-800"></i>
                  </span>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="●●●●●●●●●"
                />
              </div>
            </div>
            <div class="flex flex-col mb-6">
              <label
                for="password"
                class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >Repeat Password:</label
              >
              <div class="relative">
                <div
                  class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                >
                  <span>
                    <i class="fas fa-lock text-gray-800"></i>
                  </span>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  class="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="●●●●●●●●●"
                />
              </div>
            </div>
          </div>
          <div class="flex w-full">
            <button
              type="submit"
              class="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-gray-800 hover:bg-gray-700 rounded-2xl py-2 w-full transition duration-150 ease-in"
            >
              <span class="mr-2 uppercase">Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="flex justify-center items-center mt-6">
      <a
        href="#"
        target="_blank"
        class="inline-flex items-center text-gray-700 font-medium text-xs text-center"
      >
        <span class="ml-2"
          >Have have an account?
          <a href="/" class="text-xs ml-2 text-blue-500 font-semibold"
            >Login</a
          ></span
        >
      </a>
    </div>
  </div>
</template>
