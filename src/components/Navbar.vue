<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">{{ $t('TASK') }}</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/History">History</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/sample">sample</router-link>
          </li>  
           <li class="nav-item">
      <router-link class="nav-link d-block d-lg-none" to="/"><i class="fa-solid fa-user user-profile"></i></router-link>
          </li>
    </ul>
      </div>
    <button class="btn btn-primary" @click="$i18n.locale = `EN`">English</button>
    <button class="btn btn-dark" @click="$i18n.locale = `JP`">Japanese</button>

      <router-link class="nav-link d-none d-lg-block" to="/"><i class="fa-solid fa-user user-profile"></i></router-link>
    </div>
  </nav>
</template>
